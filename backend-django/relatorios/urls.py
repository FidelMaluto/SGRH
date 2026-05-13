from django.urls import path
from .views import RelatorioSalarios, TotalPago, MediaSalarial, MaiorSalario

urlpatterns = [
    path('salarios/', RelatorioSalarios.as_view()),
    path('total-pago/', TotalPago.as_view()),
    path('media-salarial/', MediaSalarial.as_view()),
    path('maior-salario/', MaiorSalario.as_view()),
]