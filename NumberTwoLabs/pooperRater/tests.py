from django.test import TestCase

# Create your tests here.
from pooperRater.forms import ManualPlaceCreationForm
from pooperRater.models import Place


class AjaxCallTestCase(TestCase):
    def test_math(self):
        a = 1
        b = 1
        self.assertEqual(a+b, 2)

class PlaceModelCase(TestCase):
    def setUp(self):
        self.place = Place.objects.create(name="test")
    def can_add_places(self):
        self.assertIs(self.place.name, "test")

class AddPlaceFormTestCase(TestCase):
    def setUp(self):
        self.form = ManualPlaceCreationForm()
        self.form.cleaned_data = {'name':'test', 'address':'225 Bush Street', 'city':'San Francisco'}
    def adds_to_database(self):
        self.form.save()
        self.assertIsInstance(Place.objects.get(name='test'),Place)
