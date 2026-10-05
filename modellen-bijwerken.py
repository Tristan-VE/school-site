#!/usr/bin/env python3
"""Maakt modellen.js aan uit alle .stl-bestanden in de map modellen/.

Waarom? Als je de site opent door op index.html te dubbelklikken, mag de browser
geen losse bestanden inlezen. Met modellen.js werken de 3D-modellen dan toch.
Op een echte website (of met een webserver) is dit niet nodig, maar het kan geen kwaad.

Gebruik (in de map van de site):   python3 modellen-bijwerken.py
Draai dit opnieuw als je een .stl toevoegt of vervangt.
"""
import base64, glob, json, os

map_ = os.path.dirname(os.path.abspath(__file__))
os.chdir(map_)
bestanden = sorted(glob.glob("modellen/*.stl") + glob.glob("modellen/*.STL"))
data = {}
for pad in bestanden:
    with open(pad, "rb") as f:
        data[pad.replace(os.sep, "/")] = base64.b64encode(f.read()).decode("ascii")
with open("modellen.js", "w", encoding="utf-8") as f:
    f.write("/* Automatisch gemaakt door modellen-bijwerken.py. Niet met de hand aanpassen. */\n")
    f.write("window.MODELLEN = " + json.dumps(data, indent=1) + ";\n")
print("modellen.js bijgewerkt met %d model(len)." % len(data))
