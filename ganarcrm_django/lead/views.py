from django.contrib.auth.models import User
from rest_framework import viewsets, filters

from team.models import Team
from .models import Lead
from .serializers import LeadSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view
from rest_framework.response import Response


class LeadPagination(PageNumberPagination):
    page_size = 10


class LeadViewSet(viewsets.ModelViewSet):
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()
    pagination_class = LeadPagination
    filter_backends = (filters.SearchFilter,)
    search_fields = ('company', 'contact_person')

    def perform_create(self, serializer):
        team = Team.objects.filter(members__in=[self.request.user]).first()
        serializer.save(team=team, created_by=self.request.user)

    def perform_update(self, serializer):
        try:
            member_username = self.request.data.get('assigned_to').get('username')
            if member_username:
                print(member_username)
                user = User.objects.get(username__iexact=member_username)
                serializer.save(assigned_to=user)
        except AttributeError:
            serializer.save(assigned_to=None)

    def get_queryset(self):
        team = Team.objects.filter(members__in=[self.request.user]).first()
        return self.queryset.filter(team=team)


@api_view(['POST'])
def delete_lead(request, lead_id):
    team = Team.objects.filter(members__in=[request.user]).first()

    lead = team.leads.filter(pk=lead_id)
    lead.delete()

    return Response({'message': "The lead was deleted"})
