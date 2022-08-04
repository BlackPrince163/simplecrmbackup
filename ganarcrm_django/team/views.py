from rest_framework import viewsets

from team.models import Team
from team.serializers import TeamSerializer


class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()

    def get_queryset(self):
        return self.queryset.filter(created_by=self.queryset.user)

    def perform_create(self, serializer):
        obj = serializer.save(create_by=self.request.user)
        obj.members.add(self.request.user)
        obj.save()
