/*
 if (frame == null) {
 count++;
 frame = setTimeout(function () {
 frame = null;
 }, maxDelay*2);
 } else {
 if(count == 1) {
 clearTimeout(frame);
 frame = null;
 event = $doc (document).customEvent("doubletap.end", {
 detail: {
 about: 'Fired when the user doubletaps the surface',
 delay: delay,
 inputs: inputs
 },
 bubbles: true,
 cancelable: true
 });

 element.dispatchEvent(event);
 }
 count = 0;
 }

 isDown = false;*/