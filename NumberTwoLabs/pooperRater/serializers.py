from rest_framework import serializers, permissions
from pooperRater.permissions import IsOwnerOrReadOnly
from pooperRater.models import User


class UserSerializer(serializers.ModelSerializer):

    # todo = serializers.PrimaryKeyRelatedField(many=True, queryset=Todo.objects.all())
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly,)
    class Meta:
        model = User
        fields = ['id', 'username',]

