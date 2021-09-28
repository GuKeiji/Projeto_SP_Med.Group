using Microsoft.EntityFrameworkCore;
using senai.sp_med_group.webApi.Context;
using senai.sp_med_group.webApi.Domains;
using senai.sp_med_group.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.sp_med_group.webApi.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {
        SpMedContext ctx = new SpMedContext();

        public void AlterarDescricao(string descricao, int id)
        {
            Consulta consultaBuscado = BuscarPorId(id);
            if (descricao != null)
            {
                consultaBuscado.Descricao = descricao;
                ctx.Consultas.Update(consultaBuscado);
                ctx.SaveChanges();
            };
        }

        public Consulta BuscarPorId(int id)
        {
            return ctx.Consultas.FirstOrDefault(c => c.IdConsulta == id);
        }

        public void CadastrarConsulta(Consulta novaConsulta)
        {
            novaConsulta.Descricao = "Sem descrição definida";
            novaConsulta.IdSituacao = 1;
            ctx.Consultas.Add(novaConsulta);
            ctx.SaveChanges();
        }

        public void CancelarConsulta(int Id)
        {
            Consulta consultaBuscada = BuscarPorId(Id);
            consultaBuscada.IdSituacao = 2;
            consultaBuscada.Descricao = "Consulta Cancelada";
            ctx.Consultas.Update(consultaBuscada);
            ctx.SaveChanges();
        }

        public List<Consulta> ListarMinhasConsultas(int id, int idTipoUsuario)
        {
            if (idTipoUsuario == 1)
            {
                Medico medico = ctx.Medicos.FirstOrDefault(u => u.IdUsuario == id);

                int idMedico = medico.IdMedico;

                return ctx.Consultas
                                .Where(c => c.IdMedico == idMedico)
                                .Select(p => new Consulta()
                                {
                                    DataConsulta = p.DataConsulta,
                                    IdConsulta = p.IdConsulta,
                                    IdMedicoNavigation = new Medico()
                                    {
                                        Crm = p.IdMedicoNavigation.Crm,
                                        IdUsuarioNavigation = new Usuario()
                                        {
                                            Nome = p.IdMedicoNavigation.IdUsuarioNavigation.Nome,
                                            Email = p.IdMedicoNavigation.IdUsuarioNavigation.Email
                                        }
                                    },
                                    IdPacienteNavigation = new Paciente()
                                    {
                                        Cpf = p.IdPacienteNavigation.Cpf,
                                        Telefone = p.IdPacienteNavigation.Telefone,
                                        IdUsuarioNavigation = new Usuario()
                                        {
                                            Nome = p.IdPacienteNavigation.IdUsuarioNavigation.Nome,
                                            Email = p.IdPacienteNavigation.IdUsuarioNavigation.Email
                                        }
                                    },
                                    IdSituacaoNavigation = new Situacao()
                                    {
                                        Descricao = p.IdSituacaoNavigation.Descricao
                                    }


                                })
                                .ToList();
            }
            else if (idTipoUsuario == 2)
            {
                Paciente paciente = ctx.Pacientes.FirstOrDefault(u => u.IdUsuario == id);

                int idPaciente = paciente.IdPaciente;
                return ctx.Consultas
                                .Where(c => c.IdConsulta == idPaciente)
                                .Select(p => new Consulta()
                                {
                                    DataConsulta = p.DataConsulta,
                                    IdConsulta = p.IdConsulta,
                                    IdMedicoNavigation = new Medico()
                                    {
                                        Crm = p.IdMedicoNavigation.Crm,
                                        IdUsuarioNavigation = new Usuario()
                                        {
                                            Nome = p.IdMedicoNavigation.IdUsuarioNavigation.Nome,
                                            Email = p.IdMedicoNavigation.IdUsuarioNavigation.Email
                                        }
                                    },
                                    IdPacienteNavigation = new Paciente()
                                    {
                                        Cpf = p.IdPacienteNavigation.Cpf,
                                        Telefone = p.IdPacienteNavigation.Telefone,
                                        IdUsuarioNavigation = new Usuario()
                                        {
                                            Nome = p.IdPacienteNavigation.IdUsuarioNavigation.Nome,
                                            Email = p.IdPacienteNavigation.IdUsuarioNavigation.Email
                                        }
                                    },
                                    IdSituacaoNavigation = new Situacao()
                                    {
                                        Descricao = p.IdSituacaoNavigation.Descricao
                                    }


                                })
                                .ToList();
            }

            return null;

        }

        public List<Consulta> ListarTodas()
        {
            return ctx.Consultas.ToList();
        }

        public void RemoverConsulta(int id)
        {
            ctx.Consultas.Remove(BuscarPorId(id));
            ctx.SaveChanges();
        }
    }
}
