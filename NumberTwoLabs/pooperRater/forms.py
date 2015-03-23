from django import forms
from pooperRater.models import AnonUserInfo, Place


class AnonUserInfoCreationForm(forms.ModelForm):
    class Meta:
        model = AnonUserInfo
        fields = ('anonymous_name',)
        labels = {
            'anonymous_name': "Anonymous Name"
        }

class ManualPlaceCreationForm(forms.ModelForm):
    class Meta:
        model = Place
        fields = ('name', 'address', 'city',)
        help_texts = {
            'name': 'The following fields are optional.',
        }
