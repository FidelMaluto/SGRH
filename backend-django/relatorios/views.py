from rest_framework.views import APIView
from rest_framework.response import Response
from salarios.models import Salario



class RelatorioSalarios(APIView):

    def get(self, request):
        mes = request.GET.get('mes')  # pega ?mes=4

        if mes:
            salarios = Salario.objects.filter(data_pagamento__month=mes)
        else:
            salarios = Salario.objects.all()

        dados = []

        for s in salarios:
            dados.append({
                "funcionario": s.funcionario.nome,
                "salario_final": s.salario_final(),
                "data": s.data_pagamento
            })

        return Response(dados)
    

class TotalPago(APIView):

    def get(self, request):
        total = 0

        for s in Salario.objects.all():
            total += s.salario_final()

        return Response({
            "total_pago": total
        })
    
class MediaSalarial(APIView):

    def get(self, request):
        salarios = Salario.objects.all()

        if not salarios:
            return Response({"media": 0})

        total = sum([s.salario_final() for s in salarios])
        media = total / len(salarios)

        return Response({
            "media_salarial": media
        })
    
    
class MaiorSalario(APIView):

    def get(self, request):
        maior = 0
        nome = ""

        for s in Salario.objects.all():
            if s.salario_final() > maior:
                maior = s.salario_final()
                nome = s.funcionario.nome

        return Response({
            "funcionario": nome,
            "maior_salario": maior
        })