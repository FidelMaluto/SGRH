# salarios/models.py


from django.db import models
from funcionarios.models import Funcionario

class Salario(models.Model):
    funcionario = models.ForeignKey(Funcionario, on_delete=models.CASCADE)
    salario_base = models.DecimalField(max_digits=10, decimal_places=2)
    bonus = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    desconto = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    data_pagamento = models.DateField()

    def salario_final(self):
        return self.salario_base + self.bonus - self.desconto

    def __str__(self):
        return f"{self.funcionario.nome} - {self.salario_base}"