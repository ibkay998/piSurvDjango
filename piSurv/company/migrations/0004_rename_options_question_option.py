# Generated by Django 3.2.13 on 2022-07-10 13:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0003_auto_20220710_1412'),
    ]

    operations = [
        migrations.RenameField(
            model_name='question',
            old_name='options',
            new_name='option',
        ),
    ]
