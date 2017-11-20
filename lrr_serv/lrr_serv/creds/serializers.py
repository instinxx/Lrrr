from rest_framework import serializers

from .models import Cred


class CredSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cred
        fields = '__all__'