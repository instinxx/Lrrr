from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners to access
    """

    def has_object_permission(self, request, view, obj):
        # only if you are the owner
        return obj.owner == request.user