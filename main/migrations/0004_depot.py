# Generated by Django 2.2.1 on 2019-05-25 09:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_auto_20190525_0929'),
    ]

    operations = [
        migrations.CreateModel(
            name='Depot',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('lat', models.FloatField()),
                ('lon', models.FloatField()),
            ],
        ),
    ]