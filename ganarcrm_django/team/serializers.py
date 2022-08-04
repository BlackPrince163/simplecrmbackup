from django.contrib.auth.models import User
from rest_framework import serializers

from team.models import Team


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
        )


class TeamSerializer(serializers.ModelSerializer):
    member = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = (
            "id",
            "name",
            "members",
        )
