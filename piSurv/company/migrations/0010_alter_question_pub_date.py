# Generated by Django 3.2.13 on 2022-06-18 08:44

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0009_auto_20220617_1311'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='pub_date',
            field=models.DateField(default=django.utils.timezone.now, verbose_name='date published'),
        ),
    ]