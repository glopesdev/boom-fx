#version 400
uniform vec3 color;
uniform vec3 lightposition;
uniform vec4 ambient = vec4(0.0,0.0,0.0,1.0);
uniform vec4 diffuse = vec4(1,1,1,1.0);
uniform vec4 specular = vec4(0.5,0.5,0.5,1.0);
uniform float shininess = 2000;

uniform sampler2D tex;
in vec3 position;
in vec3 normal;
out vec4 frag_colour;

void main()
{
  //frag_colour = vec4(position + color,1);

  vec3 L = normalize(lightposition - position);
   vec3 E = normalize(-position); // we are in Eye Coordinates, so EyePos is (0,0,0)  
   vec3 R = normalize(-reflect(L,normal));
 
   //calculate Ambient Term:
   vec4 Iamb = ambient;

   //calculate Diffuse Term:  
   vec4 Idiff = vec4(color,1) * diffuse * max(dot(normal,L),0.0);
   Idiff = clamp(Idiff, 0.0, 1.0);
   
   // calculate Specular Term:
   vec4 Ispec = specular * pow(max(dot(R,E),0.0),0.3*shininess);
   Ispec = clamp(Ispec, 0.0, 1.0);
   // write Total Color:  
   //frag_colour = vec4(color*0,1) + Iamb + Idiff + Ispec;
   frag_colour = Idiff + Ispec;
   //frag_colour = vec4(color*0,1) + vec4(normal,1);
}