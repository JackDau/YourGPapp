#NoEnv
#SingleInstance Force
SetTitleMatchMode, 2

^!h::
    targetWindow := "Setup sessions"

    ; Ensure the Setup sessions window exists
    IfWinNotExist, %targetWindow%
    {
        MsgBox, Could not find "%targetWindow%" window.
        return
    }

    WinActivate, %targetWindow%
    WinWaitActive, %targetWindow%, , 5

    Loop, 30
    {
        ; Press Alt+D to trigger delete
        Send, !d
        Sleep, 300

        ; Press Enter to confirm deletion
        Send, {Enter}

        ; Wait for the window to become responsive again
        ; (handles the variable-length pause after confirmation)
        Loop
        {
            Sleep, 500
            IfWinActive, %targetWindow%
                break
        }

        ; Small extra pause to let the UI settle and select the next session
        Sleep, 300
    }

    MsgBox, Done — deleted 30 sessions.
return
