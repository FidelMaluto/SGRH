from rest_framework import serializers
from .models import Salario


class SalarioSerializer(serializers.ModelSerializer):
    salario_final = serializers.SerializerMethodField()

    class Meta:
        model = Salario
        fields = '__all__'

    def get_salario_final(self, obj):
        return obj.salario_final()