from django.urls import path, include
from rest_framework import routers
from noticias import views
from rest_framework.documentation import include_docs_urls


router = routers.DefaultRouter()
router.register(r'noticias',views.NoticiasApi, 'noticias')
router.register(r'usuarios',views.UsuariosApi, 'usuarios')
router.register(r'grupos',views.GruposApi, 'grupos')
router.register(r'comentarios',views.ComentariosApi, 'comentarios')

urlpatterns = [
    path('api/',include(router.urls)),
    path('docs/', include_docs_urls(title="Noticias API"))
]