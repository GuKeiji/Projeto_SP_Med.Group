using senai.sp_med_group.webApi.Context;
using senai.sp_med_group.webApi.Domains;
using senai.sp_med_group.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.sp_med_group.webApi.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        SpMedContext ctx = new SpMedContext();

        public void Atualizar(int id, Usuario usuarioAtualizado)
        {
            Usuario usuarioBuscado = BuscarPorId(id);

            if (usuarioAtualizado.Nome != null || usuarioAtualizado.Senha != null || usuarioAtualizado.Email != null)
            {
                usuarioBuscado.Nome = usuarioAtualizado.Nome;
                usuarioBuscado.Email = usuarioAtualizado.Email;
                usuarioBuscado.Senha = usuarioAtualizado.Senha;

                ctx.Usuarios.Update(usuarioBuscado);

                ctx.SaveChanges();
            }
        }

        public Usuario BuscarPorId(int id)
        {
            return ctx.Usuarios.FirstOrDefault(u => u.IdUsuario == id);
        }

        public void Cadastrar(Usuario novoUsuario)
        {
            ctx.Usuarios.Add(novoUsuario);

            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            ctx.Usuarios.Remove(BuscarPorId(id));

            ctx.SaveChanges();
        }

        public List<Usuario> ListarUsuarios()
        {
            return ctx.Usuarios
                .Select(u => new Usuario
                {
                    Email = u.Email,
                    Nome = u.Nome,
                    IdTipoUsuarioNavigation = new Tipousuario()
                    {
                        Tipo = u.IdTipoUsuarioNavigation.Tipo
                    }
                }).ToList();
        }

        public Usuario Login(string email, string senha)
        {
            return ctx.Usuarios.FirstOrDefault(u => u.Email == email && u.Senha == senha);
        }
    }
}
