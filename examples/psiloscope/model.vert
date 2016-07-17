#version 410
// Original mesh vertex attributes
layout(location = 0) in vec3 vp;
layout(location = 1) in vec3 vn;

// Extension mesh vertex attributes
layout(location = 2) in vec3 accel;
layout(location = 3) in vec3 gyro;
layout(location = 4) in vec3 mag;

// Output attributes
out vec3 position;
out vec3 normal;
flat out int faceId;

// Render parameters
uniform mat4 mvp;
uniform mat4 mv;

void main()
{
  faceId = gl_VertexID / 4;
  vec4 v = vec4(vp - accel * faceId, 1.0);
  gl_Position = mvp * v;
  mat4 normalmat = transpose(inverse(mv));
  position = vec3(mv * v);
  normal = normalize(vec3(normalmat * vec4(vn, 1.0)));
}