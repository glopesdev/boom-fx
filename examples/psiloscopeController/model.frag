#version 400
uniform vec3 lightposition;
uniform vec4 ambient = vec4(0.0,0.0,0.0,1.0);
uniform vec4 diffuse = vec4(0.3,0.3,0.3,1.0);
uniform vec4 specular = vec4(0.5,0.5,0.5,1.0);
uniform float shininess = 2000;

uniform sampler2D tex;
in vec3 position;
in vec3 normal;
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

float rand(vec2 n)
{
  return 0.5 + 0.5 * 
     fract(sin(dot(n.xy, vec2(12.9898, 78.233)))* 43758.5453);
}

void main()
{
  //frag_colour = vec4(position + color,1);

  vec3 L = normalize(lightposition - position);
   vec3 E = normalize(-position); // we are in Eye Coordinates, so EyePos is (0,0,0)  
   vec3 R = normalize(-reflect(L,normal));
 
   //calculate Ambient Term:
   vec4 Iamb = ambient;

   //calculate Diffuse Term:  
   vec4 Idiff = diffuse * max(dot(normal,L),0.0);
   Idiff = clamp(Idiff, 0.0, 1.0);
   
   // calculate Specular Term:
   vec4 Ispec = specular * pow(max(dot(R,E),0.0),0.3*shininess);
   Ispec = clamp(Ispec, 0.0, 1.0);
   // write Total Color:  
   //frag_colour = vec4(color*0,1) + Iamb + Idiff + Ispec;
   //frag_colour = Idiff + Ispec + vec4(normal,1) + 0.5;
   //frag_colour = vec4(color*0,1) + vec4(normal,1);
   float w2 = (faceId % 2 == 0) ? on : off;
   float w3 = (faceId % 3 == 0) ? on : off;
   float w4 = (faceId % 4 == 0) ? on : off;
   float w5 = (faceId % 5 == 0) ? on : off;
   float w6 = (faceId % 6 == 0) ? on : off;
   float w7 = (faceId % 7 == 0) ? on : off;
   float w8 = (faceId % 8 == 0) ? on : off;
   float w9 = (faceId % 9 == 0) ? on : off;
   float w10 = (faceId % 10 == 0) ? on : off;
   float w11 = (faceId % 11 == 0) ? on : off;
   float w12 = (faceId % 12 == 0) ? on : off;
   float w13 = (faceId % 13 == 0) ? on : off;
   float w14 = (faceId % 14 == 0) ? on : off;
   float w15 = (faceId % 15 == 0) ? on : off;
   float w16 = (faceId % 16 == 0) ? on : off;
   float w17 = (faceId % 17 == 0) ? on : off;
   float w19 = (faceId % 19 == 0) ? on : off;
   float w23 = (faceId % 23 == 0) ? on : off;
   float w29 = (faceId % 29 == 0) ? on : off;
   float w31 = (faceId % 31 == 0) ? on : off;
   float w37 = (faceId % 37 == 0) ? on : off;
   float w41 = (faceId % 41 == 0) ? on : off;
   float h = faceId / 180.0;
   vec3 hsv = vec3(h,1,1);
   frag_colour = vec4(hsv2rgb(hsv),1);

   //float m = rand(vec2(h,faceId));
   //frag_colour = 0.5 * vec4(h,m,1,1);
   //frag_colour += 0.5 * vec4(w23+w29+w37+w31,w2+w13+w17+w19,w3+w5+w7+w11,1);
}
