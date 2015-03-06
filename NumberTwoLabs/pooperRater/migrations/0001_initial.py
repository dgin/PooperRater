# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AnonUserInfo',
            fields=[
                ('user', models.OneToOneField(primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('anon_name', models.CharField(default=b'Anonymous', max_length=80)),
                ('user_img', models.ImageField(null=True, upload_to=b'')),
            ],
            options={
                'abstract': False,
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
            },
            bases=('auth.user',),
        ),
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=80)),
                ('floor', models.IntegerField(null=True)),
                ('unit', models.CharField(max_length=5, null=True, blank=True)),
                ('address', models.CharField(max_length=120, null=True, blank=True)),
                ('desc', models.TextField(null=True, blank=True)),
                ('type', models.SmallIntegerField(max_length=2, null=True)),
                ('start_hours', models.TimeField(null=True)),
                ('end_hours', models.TimeField(null=True)),
                ('pic', models.ImageField(null=True, upload_to=b'')),
                ('yelp_id', models.CharField(max_length=100, null=True, blank=True)),
                ('yelp_categories', models.TextField(blank=True)),
                ('google_id', models.CharField(max_length=100, null=True, blank=True)),
                ('google_lat', models.SmallIntegerField(null=True)),
                ('google_long', models.SmallIntegerField(null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
