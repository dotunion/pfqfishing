# better pfq fishing sparkling visuals
<ins> includes the following </ins>
- replace ripples sprite sheet with your own edits/recolors
- option to add an additional image on top of the sparkled ripples
- options for brightness, glow, pulsing animation, and scaling of the ripple sprite (when sparkles trigger)
- add a custom sound effect when sparkles trigger

## how to install
- you must have [tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) installed on your browser
- create a new userscript in the tampermonkey dashboard (extension icon -> create a new script)
- copy the userscript in this repo and replace it with the default template in a new userscript
- ctrl + s to save, make sure you have it turned on while you're fishing

## how to customize
around the top of the userscript are configurations like "image", "imagesize", and "ripplesprite". you can customize the urls of the custom image, ripple sprite and sound effect there. them blank as `""` to default them back to its original sprite/no sound/no image  

under ` style.textContent = `, you can tinker with the css that's being added to the animation and glow

## etc
you can find me @ dotunion on discord for questions. [this is my pfq](https://pfq.link/@J3dF)
