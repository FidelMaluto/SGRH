# salarios/views.py
from rest_framework.viewsets import ModelViewSet
from .models import Salario
from .serializers import SalarioSerializer
from rest_framework.decorators import action
from rest_framework.response import Response



class SalarioViewSet(ModelViewSet):
    queryset = Salario.objects.all()
    serializer_class = SalarioSerializer

    
    @action(detail=False, methods=['get'], url_path='por-funcionario/(?P<funcionario_id>[^/.]+)')
    def por_funcionario(self, request, funcionario_id=None):
        salarios = Salario.objects.filter(funcionario_id=funcionario_id)
        serializer = self.get_serializer(salarios, many=True)
        return Response(serializer.data)