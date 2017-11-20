from rest_framework import serializers

from .models import Cred


class CredSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Cred
        fields = '__all__'