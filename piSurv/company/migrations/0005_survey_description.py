# Generated by Django 3.2.13 on 2022-07-11 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0004_rename_options_question_option'),
    ]

    operations = [
        migrations.AddField(
            model_name='survey',
            name='description',
            field=models.CharField(default='Untitled Document', max_length=200),
        ),
    ]
