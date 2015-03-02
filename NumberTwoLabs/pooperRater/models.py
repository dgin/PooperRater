from django.db import models

# Create your models here.
class Places(models.Model):
    floor = models.IntegerField(null=True)
    unit = models.CharField(null=True, blank=True, max_length=1)
    address = models.CharField(null=True, max_length=120)
    desc = models.TextField(null=True)
    type = models.IntegerField(null=True)
    start_hours = models.TimeField(null=True)
    end_hours = models.TimeField(null=True)
    pic = models.ImageField(null=True)

    def __unicode__(self):
        return u"{}".format(self.title)