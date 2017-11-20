# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Cred(models.Model):
    bit_length = models.IntegerField()
    wiegand_binary = models.BinaryField()
    wiegand_hex = models.CharField(max_length=16)
    iclass_std_enc_hex = models.CharField(max_length=16)
    fac_code = models.IntegerField()
    card_num = models.IntegerField()
    card_num_no_fac = models.IntegerField()
    owner = models.ForeignKey('auth.User', related_name='cred', on_delete=models.CASCADE, blank=True, null=True)

