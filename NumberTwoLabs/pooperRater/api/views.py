from django.contrib.auth.models import User
from rest_framework import viewsets, generics, filters
from pooperRater.models import Rating, Place, User, AnonUserInfo, Vote
from pooperRater.api.serializer import RatingSerializer, PlaceSerializer, UserSerializer, AnonUserInfoSerializer, VoteSerializer
from pooperRater.permissions import IsOwnerOrReadOnly, IsAdminUserOrReadOnly, AnonInfoIsRelatedUserOrReadOnly, UserIsOwnerOrReadOnly, VoteIsOwnerOrReadOnly
from rest_framework import permissions


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)


class PlaceRatingViewSet(generics.ListCreateAPIView):
    serializer_class = RatingSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

    def get_queryset(self, *args, **kwargs):
        return Rating.objects.filter(place__id=self.kwargs.get('pk'))


class RatingOwnerViewSet(generics.ListCreateAPIView):
    serializer_class = AnonUserInfoSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, AnonInfoIsRelatedUserOrReadOnly,)

    def get_queryset(self, *args, **kwargs):
        u = User.objects.get(rating__id=self.kwargs.get('pk'))
        return AnonUserInfo.objects.filter(related_user=u)


class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    permission_classes = ()
    filter_backends = (filters.SearchFilter,)
    search_fields = ('yelp_id',)
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsAdminUserOrReadOnly,)

class PlaceSearchViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    permission_classes = ()
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'address', 'city',)

class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, VoteIsOwnerOrReadOnly,)

# class RatingsVoteViewSet(viewsets.ModelViewSet):
#     serializer_class = VoteSerializer
#
#     def get_queryset(self, *args, **kwarg):
#         return Rating.object.get(rating__id=self.kwargs.get('pk'))
#
#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         headers = self.get_success_headers(serializer.data)
#         return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, UserIsOwnerOrReadOnly,)


class AnonUserInfoViewSet(viewsets.ModelViewSet):
    queryset = AnonUserInfo.objects.all()
    serializer_class = AnonUserInfoSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, AnonInfoIsRelatedUserOrReadOnly,)

