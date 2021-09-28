using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace senai.sp_med_group.webApi.Domains
{
    public partial class Usuario
    {
        public Usuario()
        {
            Medicos = new HashSet<Medico>();
            Pacientes = new HashSet<Paciente>();
        }

        public int IdUsuario { get; set; }
        public byte? IdTipoUsuario { get; set; }
        public string Nome { get; set; }
        [Required(ErrorMessage = "O campo e-mail é obrigatório!")]
        public string Email { get; set; }
        [Required(ErrorMessage = "O campo senha é obrigatório!")]
        [StringLength(12, MinimumLength = 8, ErrorMessage = "A senha deve ter de 8 a 12 caracteres!")]
        public string Senha { get; set; }

        public virtual Tipousuario IdTipoUsuarioNavigation { get; set; }
        public virtual ICollection<Medico> Medicos { get; set; }
        public virtual ICollection<Paciente> Pacientes { get; set; }
    }
}
