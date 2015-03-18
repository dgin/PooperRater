from django import forms
from pooperRater.models import AnonUserInfo, Place


class AnonUserInfoCreationForm(forms.ModelForm):
    class Meta:
        model = AnonUserInfo
        fields = ('anonymous_name', 'user_img')

class ManualPlaceCreationForm(forms.ModelForm):
    class Meta:
        model = Place
        fields = ('name', 'address', 'city', 'desc', 'start_hours', 'end_hours',)
        labels = {
            'desc': 'Description',
        }
        help_texts = {
            'name': 'The following fields are optional.',
            'start_hours': 'Example input: 8:00, 23:00'
        }
