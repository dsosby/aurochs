module Aurochs.WebServer

open System

open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer

open Microsoft.Extensions.DependencyInjection

open Giraffe

let webApp =
    choose [
        route "/ping"   >=> text "pong" ]


let configureApp (app: IApplicationBuilder) =
    // Add Giraffe to the ASP.NET Core pipeline
    app.UseGiraffe webApp

    // TODO Get this from hosting env?
    let isDevelopment = true

    if isDevelopment then app.UseDeveloperExceptionPage() |> ignore
    else app.UseHsts() |> ignore

    app.UseHttpsRedirection()
       .UseStaticFiles()
       .UseSpaStaticFiles()
       |> ignore

    app.UseSpa(fun spa ->
        spa.Options.SourcePath <- "ClientApp"
        if isDevelopment then
            spa.UseReactDevelopmentServer(npmScript = "start")) |> ignore


let configureServices (services: IServiceCollection) =
    // Add Giraffe dependencies
    services.AddGiraffe() |> ignore

    // SPA Stuff
    services.AddSpaStaticFiles((fun configuration -> configuration.RootPath <- "ClientApp/build"))


[<EntryPoint>]
let main _ =
    WebHostBuilder()
        .UseKestrel()
        .Configure(Action<IApplicationBuilder> configureApp)
        .ConfigureServices(configureServices)
        .Build()
        .Run()
    0