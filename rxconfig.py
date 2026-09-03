import reflex as rx

config = rx.Config(
    app_name="vetements",
    plugins=[
        rx.plugins.SitemapPlugin(),
        rx.plugins.TailwindV4Plugin(),
        rx.plugins.RadixThemesPlugin(
            theme=rx.theme(
                appearance="light",
                accent_color="ruby",
                gray_color="sand",
                radius="small",
            )
        ),
    ]
)