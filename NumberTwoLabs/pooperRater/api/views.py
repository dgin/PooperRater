from rest_framework import viewsets
from pooperRater.models import Rating, Place, Comment, Restroom, User, AnonUserInfo
from pooperRater.api.serializer import RatingSerializer, PlaceSerializer, CommentSerializer, RestroomSerializer, UserSerializer, AnonUserInfoSerializer
from pooperRater.permissions import IsOwnerOrReadOnly, IsAdminUserOrReadPostOnly, AnonInfoIsRelatedUserOrReadOnly, UserIsOwnerOrReadOnly
from rest_framework import permissions



class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly,)


class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsAdminUserOrReadPostOnly,)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly,)


class RestroomViewSet(viewsets.ModelViewSet):
    queryset = Restroom.objects.all()
    serializer_class = RestroomSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,UserIsOwnerOrReadOnly,)

class AnonUserInfoVIewSet(viewsets.ModelViewSet):
    queryset = AnonUserInfo.objects.all()
    serializer_class = AnonUserInfoSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,AnonInfoIsRelatedUserOrReadOnly,)

