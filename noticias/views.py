
from rest_framework import viewsets
from .serializer import NoticiasSerializer, ComentariosSerializer, GruposSerializer, UsuariosSerializer
from .models import noticias, grupos, usuarios, comentarios

class NoticiasApi(viewsets.ModelViewSet):
    serializer_class = NoticiasSerializer
    queryset =  noticias.objects.all()

class UsuariosApi(viewsets.ModelViewSet):
    serializer_class = UsuariosSerializer
    queryset = usuarios.objects.all()

class ComentariosApi(viewsets.ModelViewSet):
    serializer_class = ComentariosSerializer
    queryset = comentarios.objects.all()


class GruposApi(viewsets.ModelViewSet):
    serializer_class = GruposSerializer
    queryset =  grupos.objects.all()