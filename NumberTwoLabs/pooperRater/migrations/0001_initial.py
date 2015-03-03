# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Places',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('floor', models.IntegerField(null=True)),
                ('unit', models.CharField(max_length=1, null=True, blank=True)),
                ('address', models.CharField(max_length=120, null=True)),
                ('desc', models.TextField(null=True)),
                ('type', models.IntegerField(null=True)),
                ('start_hours', models.TimeField(null=True)),
                ('end_hours', models.TimeField(null=True)),
                ('pic', models.ImageField(null=True, upload_to=b'')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
