import psycopg2
import pymorphy2
import pandas as pd
import re
import json

conn = psycopg2.connect(dbname='dajssft8q08m5u', user='prtjngzjseeihk',
                        password='7f79d049881ac9feff1a94373b427b9aa7653f6a774f87318f99f25fc0a92445', host='ec2-54-246-92-116.eu-west-1.compute.amazonaws.com')
cursor = conn.cursor()

cursor.execute('SELECT * FROM main_sight')

records = cursor.fetchall()

cursor.close()
conn.close()

df = pd.DataFrame(columns=['text', 'category'])


for j, el in enumerate(records):
    row = [el[1] + " " + el[2]]
    max_cat = -1
    a = el[-1].replace('\'', '"')
    new = json.loads(a)
    for key in new:
        if new[key] >= max_cat:
            max_cat = new[key]
            category = key
    row.append(category)
    df.loc[j] = row

def tolow(df, col):
    df[col] = df[col].apply(str.lower)
    return df

def delInfo(df, col):
    df[col] = df[col].apply(lambda x: re.sub(r'\(*\)',' ', x))
    return df

def delShortWords(df, col):
    df[col] = df[col].apply(lambda x: re.sub(r'\s\w{1,3}\s',' ', x))
    return df


def delPunc(df, col):
    df[col] = df[col].apply(lambda x: re.sub(r'[!,\.\?\*\(\)"“”«»:;#№\-@%\+]',' ', x))
    return df

def delGreat(df, col):
    words = [r'здравствуйте', r'добрый день', r'добрый вечер', r'доброе утро', r'приветствую']
    for el in words:
        df[col] = df[col].apply(lambda x: re.sub(el,' ', x))
    return df

def delWord(df, col, word):
    df[col] = df[col].apply(lambda x: re.sub(word,' ', x))
    return df

def delE(df, col):
    df[col] = df[col].apply(lambda x: re.sub(r'ё','е', x))
    return df

def delSpace(df, col):
    df[col] = df[col].apply(lambda x: re.sub(r'\s{2,}', ' ', x))
    return df

def delDig(df, col):
    df[col] = df[col].apply(lambda x: re.sub(r'\d+', ' ', x))
    return df

morph = pymorphy2.MorphAnalyzer()
def normalize(text):
    s = ''
    for el in text.split(' '):
        s+= morph.parse(el)[0].normal_form + ' '
    return s

for el, col in zip([df], ['text']):
    for f in [tolow, delInfo, delPunc, delGreat, delE, delDig, delShortWords, delSpace]:
        el = f(el, col)
        el[col] = el[col].apply(lambda x: normalize(x))

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.svm import SVC

text_clf = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', RandomForestClassifier())
])

text_clf.fit(list(df['text']), list(df['category']))

import pickle
# now you can save it to a file
with open('model.pkl', 'wb') as f:
    pickle.dump(text_clf, f)