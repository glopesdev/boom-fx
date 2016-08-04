#version 400
uniform sampler2D tex;
in vec2 tex_coord;
out vec4 frag_colour;

void main()
{
  vec4 texel = texture(tex, tex_coord);
  frag_colour = texel;
}
