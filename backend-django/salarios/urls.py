# salarios/urls.py
from rest_framework.routers import DefaultRouter
from .views import SalarioViewSet

router = DefaultRouter()
router.register('salarios', SalarioViewSet)

urlpatterns = router.urls