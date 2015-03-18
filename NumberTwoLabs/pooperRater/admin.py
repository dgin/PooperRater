from django.contrib import admin
from pooperRater.models import *

# Register your models here.
admin.site.register(AnonUserInfo)
admin.site.register(Place)
admin.site.register(Rating)
admin.site.register(Comment)
admin.site.register(Vote)
admin.site.register(Restroom)