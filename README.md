# Lrrr

Adding to Linuz' project is a simply mobile app that relays sniffed cards to a backend django web server. This allows for sharing
HID cards to others outside of the typical range of WiFi in a rather instantaneous manner.

Linuz' code now is in the raspberrypi directory. A JSON api was added to the webserver running on the raspberry pi. Note this 
replacement will break the install process, so the files need to be installed manually rather than git cloning in the setup.py. 
I ran into problems with the original way anyway.

The app is written in Ionic v1 (outdated, I know, but easy). When the phone is connected to the raspberry pi wifi, it can read 
card data from the new JSON api. When connected to cellular or network attached wifi, it can, after authentication, upload the data
to the django web server. Inside lrrapp, in services.js, the endpoints need to be set to something useful for your setup.

![GitHub Logo](https://vignette.wikia.nocookie.net/villains/images/3/3b/Lrrr_gun.jpg/revision/latest/scale-to-width-down/310?cb=20150721194908)
