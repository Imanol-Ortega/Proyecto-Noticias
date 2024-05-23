
from rest_framework import viewsets
from .serializer import NoticiasSerializer, ComentariosSerializer, GruposSerializer, UsuariosSerializer
from .models import noticias, grupos, usuarios, comentarios

class NoticiasApi(viewsets.ModelViewSet):
    serializer_class = NoticiasSerializer
    querySet =  noticias.objects.all()