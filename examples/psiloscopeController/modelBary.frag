#version 400
uniform vec3 lightposition;
uniform vec4 ambient = vec4(0.0,0.0,0.0,1.0);
uniform vec4 diffuse = vec4(0.3,0.3,0.3,1.0);
uniform vec4 specular = vec4(0.5,0.5,0.5,1.0);
uniform float shininess = 2000;

uniform sampler2D tex;

in vec3 position;
in vec3 normal;
in vec3 color;
flat in int faceId;
out vec4 frag_colour;

uniform float on = 1.0 / 4.0;
uniform float off = 0.5 / 4.0;

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main()
{
   float h = faceId / 180.0;
   vec3 hsv = vec3(h,1,1);
   frag_colour = vec4(hsv2rgb(hsv),1);
   frag_colour = vec4(color / 10.0,1); // RGBA
}
