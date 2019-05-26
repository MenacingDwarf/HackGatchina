import pickle
import pymorphy2
import re
import os

def normalize(text):
    morph = pymorphy2.MorphAnalyzer()
    s = ''
    for el in text.split(' '):
        s+= morph.parse(el)[0].normal_form + ' '
    return s

def prediction(discription):
    print(os.path.abspath(os.curdir))
    with open('model.pkl', 'rb') as f:
        text_clf = pickle.load(f)
    discription = discription.lower()
    discription = re.sub(r'\(*\)', ' ', discription)
    discription = re.sub(r'\s\w{1,3}\s', ' ', discription)
    discription = re.sub(r'[!,\.\?\*\(\)"“”«»:;#№\-@%\+]', ' ', discription)
    discription = re.sub(r'ё', 'е', discription)
    discription = re.sub(r'\s{2,}', ' ', discription)
    discription = re.sub(r'\d+', ' ', discription)
    discription = normalize(discription)
    return text_clf.predict_proba([discription])[0]