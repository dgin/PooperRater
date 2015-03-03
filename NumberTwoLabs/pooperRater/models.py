from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Place(models.Model):
    # Place data - general
    name = models.CharField(max_length=80)
    floor = models.IntegerField(null=True)
    unit = models.CharField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    desc = models.TextField(null=True, blank=True)
    type = models.SmallIntegerField(max_length=2, null=True)
    start_hours = models.TimeField(null=True)
    end_hours = models.TimeField(null=True)
    pic = models.ImageField(null=True)

    # Place data specific to yelp
    yelp_id = models.CharField(max_length=100, null=True, blank=True)
    yelp_categories = models.TextField(blank=True)

    # Place data specific to google
    google_id = models.CharField(max_length=100, null=True, blank=True)
    google_lat = models.SmallIntegerField(null=True)
    google_long = models.SmallIntegerField(null=True)

    type_conversion = {
        1: "placeholder",
        2: "bad food",
        3: "new string"
    }

    def __unicode__(self):
        return u"{}".format(self.name) + " Types: {}.".format(self.type_conversion[self.type])


class Comment(models.Model):
    user = models.ForeignKey(User)
