$(document).ready(function () {
  $("#github-link").on("click", function (e) {
    e.preventDefault(); // evita que redireccione automáticamente

    const $preview = $("#github-preview");
    const $info = $("#repo-info");

    // Si ya está visible, lo oculta
    if ($preview.is(":visible")) {
      $preview.slideUp();
      return;
    }

    // Si no está visible, lo muestra y trae los datos
    $preview.slideDown();
    $info.text("Cargando información...");

    $.get("https://api.github.com/users/danielantonio-driod/repos", function (repos) {
      const repo = repos.find(r => r.name.toLowerCase() === "entregas_bootcamp");

      if (repo) {
    $info.html(`
  <div style="margin-bottom: 20px;">
    <h3 style="font-size: 2em; color: #003366;">🔍 ¡Explora mis proyectos en GitHub!</h3>
    <p style="font-size: 1.2em;">Este repositorio contiene entregas y desarrollos que he trabajado durante el bootcamp. Te invito a revisar el código, las buenas prácticas aplicadas y mi crecimiento como desarrollador.</p>
  </div>
  <div class="repo-box" style="background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <h4 style="margin-bottom: 10px;"><strong>${repo.name}</strong></h4>
    <p>${repo.description || "Sin descripción disponible."}</p>
    <p><strong>Última actualización:</strong> ${new Date(repo.updated_at).toLocaleString()}</p>
    <a href="${repo.html_url}" target="_blank" class="btn btn-sm btn-primary">Ir al repositorio</a>
  </div>
`);

      } else {
        $info.html("No se encontró el repositorio.");
      }
    }).fail(function () {
      $info.html("<span style='color:red;'>Error al obtener los datos del repositorio.</span>");
    });
  });
});
