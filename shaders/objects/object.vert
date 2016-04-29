#version 410
layout(location = 0) in vec3 vp;
layout(location = 1) in vec3 vn;
out vec3 position;
out vec3 normal;
uniform mat4 mvp;
uniform mat4 mv;

void main()
{
  vec4 v = vec4(vp * 1.3, 1.0);
  gl_Position = mvp * v;
  mat4 normalmat = transpose(inverse(mv));
  position = vec3(mv * v);
  normal = normalize(vec3(normalmat * vec4(vn, 1.0)));
}