# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('body', models.TextField(null=True, blank=True)),
                ('upvote', models.SmallIntegerField(null=True, blank=True)),
                ('downvote', models.SmallIntegerField(null=True, blank=True)),
                ('date', models.TimeField(null=True)),
            ],
            options={
            },
            bases=(models.Model,),
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
                ('place_type', models.SmallIntegerField(null=True)),
                ('start_hours', models.TimeField(null=True)),
                ('end_hours', models.TimeField(null=True)),
                ('pic', models.ImageField(null=True, upload_to=b'', blank=True)),
                ('yelp_id', models.CharField(max_length=100, null=True, blank=True)),
                ('yelp_categories', models.TextField(blank=True)),
                ('google_id', models.CharField(max_length=100, null=True, blank=True)),
                ('google_lat', models.SmallIntegerField(null=True, blank=True)),
                ('google_long', models.SmallIntegerField(null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('air_flow', models.SmallIntegerField()),
                ('cleanliness', models.SmallIntegerField()),
                ('available', models.SmallIntegerField()),
                ('quality', models.SmallIntegerField()),
                ('other', models.SmallIntegerField()),
                ('places', models.ForeignKey(to='pooperRater.Place')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Restroom',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('floor', models.CharField(max_length=3, null=True, blank=True)),
                ('local_identifier', models.SmallIntegerField(null=True)),
                ('type', models.SmallIntegerField(max_length=1)),
                ('features', models.TextField(null=True, blank=True)),
                ('place', models.ForeignKey(to='pooperRater.Place')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='comment',
            name='rating',
            field=models.OneToOneField(to='pooperRater.Rating'),
            preserve_default=True,
        ),
    ]
