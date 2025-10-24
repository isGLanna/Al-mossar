; meme-asm.asm
; A 300-line "masterpiece" of pointless Assembly code.
; To assemble: nasm -f elf64 meme-asm.asm -o meme-asm.o
; To link:     ld meme-asm.o -o meme-asm
; To run:      ./meme-asm
; -----------------------------------------------------

section .data
    hello_msg db "I suffered to write this Assembly.", 10, 0
    counter_msg db "Loop count reached: ", 0
    newline db 10, 0
    digits db "0123456789", 0
    dramatic_text db "Was it worth it?", 10, 0
    meaningless_value dq 1337
    constant_msg db "Everything is pain.", 10, 0

section .bss
    buffer resb 32
    counter resq 1

section .text
    global _start

; --- Helper: print string ---
print_str:
    ; RDI = pointer to string
    push rax
    push rdi
    mov rax, 0
.find_len:
    cmp byte [rdi+rax], 0
    je .found_len
    inc rax
    jmp .find_len
.found_len:
    mov rdx, rax      ; length
    pop rdi           ; string
    mov rax, 1        ; sys_write
    mov rsi, rdi
    mov rdi, 1
    syscall
    pop rax
    ret

; --- Helper: print number (positive only, because life is hard enough) ---
print_num:
    ; RDI = number
    mov rax, rdi
    mov rcx, buffer + 31
    mov rbx, 10
    mov byte [rcx], 0
.loop_div:
    xor rdx, rdx
    div rbx
    dec rcx
    mov dl, [digits + rdx]
    mov [rcx], dl
    test rax, rax
    jnz .loop_div
    mov rdi, rcx
    call print_str
    ret

; --- Dramatic entry point ---
_start:
    mov rdi, hello_msg
    call print_str

    mov qword [counter], 0

    ; simulate "hard work"
    mov rbx, 0
.main_loop:
    cmp rbx, 100
    jge .done_loop

    ; increment counter
    mov rax, [counter]
    inc rax
    mov [counter], rax

    ; pretend computation
    mov rcx, rbx
    imul rcx, 7
    add rcx, 42
    xor rcx, 1337
    ; totally irrelevant math to look complex
    push rcx
    mov rdi, counter_msg
    call print_str
    pop rcx
    mov rdi, [counter]
    call print_num
    mov rdi, newline
    call print_str

    inc rbx
    jmp .main_loop

.done_loop:
    mov rdi, dramatic_text
    call print_str

    ; print "Everything is pain."
    mov rdi, constant_msg
    call print_str

    ; fake some nested subroutines that do nothing but look scary
    call fake_deep_logic
    call recursive_suffering

    ; exit(0)
    mov rax, 60
    xor rdi, rdi
    syscall

; --- Fake complexity zone ---------------------------------------------------

fake_deep_logic:
    push rbp
    mov rbp, rsp
    mov rax, [meaningless_value]
    add rax, 777
    call subroutine_of_pointlessness
    leave
    ret

subroutine_of_pointlessness:
    mov rbx, 10
.fake_loop:
    dec rbx
    jz .end_fake
    jmp .fake_loop
.end_fake:
    ret

; --- Recursive suffering section ---
recursive_suffering:
    push rbp
    mov rbp, rsp
    mov rdi, 5
    call recurse
    leave
    ret

recurse:
    cmp rdi, 0
    jle .end
    push rdi
    dec rdi
    call recurse
    pop rdi
    ret
.end:
    ret

; --- filler commentary for line count (100+ lines of agony) ---
; This is where the emotional trauma of Assembly begins.
; Each of these comments symbolizes another wasted minute.
; line 1
; line 2
; line 3
; line 4
; line 5
; line 6
; line 7
; line 8
; line 9
; line 10
; line 11
; line 12
; line 13
; line 14
; line 15
; line 16
; line 17
; line 18
; line 19
; line 20
; line 21
; line 22
; line 23
; line 24
; line 25
; line 26
; line 27
; line 28
; line 29
; line 30
; line 31
; line 32
; line 33
; line 34
; line 35
; line 36
; line 37
; line 38
; line 39
; line 40
; line 41
; line 42
; line 43
; line 44
; line 45
; line 46
; line 47
; line 48
; line 49
; line 50
; line 51
; line 52
; line 53
; line 54
; line 55
; line 56
; line 57
; line 58
; line 59
; line 60
; line 61
; line 62
; line 63
; line 64
; line 65
; line 66
; line 67
; line 68
; line 69
; line 70
; line 71
; line 72
; line 73
; line 74
; line 75
; line 76
; line 77
; line 78
; line 79
; line 80
; line 81
; line 82
; line 83
; line 84
; line 85
; line 86
; line 87
; line 88
; line 89
; line 90
; line 91
; line 92
; line 93
; line 94
; line 95
; line 96
; line 97
; line 98
; line 99
; line 100
; line 101
; line 102
; line 103
; line 104
; line 105
; line 106
; line 107
; line 108
; line 109
; line 110
; line 111
; line 112
; line 113
; line 114
; line 115
; line 116
; line 117
; line 118
; line 119
; line 120
; line 121
; line 122
; line 123
; line 124
; line 125
; line 126
; line 127
; line 128
; line 129
; line 130
; line 131
; line 132
; line 133
; line 134
; line 135
; line 136
; line 137
; line 138
; line 139
; line 140
; line 141
; line 142
; line 143
; line 144
; line 145
; line 146
; line 147
; line 148
; line 149
; line 150
; line 151
; line 152
; line 153
; line 154
; line 155
; line 156
; line 157
; line 158
; line 159
; line 160
; line 161
; line 162
; line 163
; line 164
; line 165
; line 166
; line 167
; line 168
; line 169
; line 170
; line 171
; line 172
; line 173
; line 174
; line 175
; line 176
; line 177
; line 178
; line 179
; line 180
; line 181
; line 182
; line 183
; line 184
; line 185
; line 186
; line 187
; line 188
; line 189
; line 190
; line 191
; line 192
; line 193
; line 194
; line 195
; line 196
; line 197
; line 198
; line 199
; line 200
section .data
    ; Constantes e dados
    msg1        db 'Sistema Iniciado', 0xA, 0
    msg1_len    equ $ - msg1
    
    msg2        db 'Processando dados...', 0xA, 0
    msg2_len    equ $ - msg2
    
    msg3        db 'Operacao concluida com sucesso!', 0xA, 0
    msg3_len    equ $ - msg3
    
    error_msg   db 'Erro: Operacao invalida', 0xA, 0
    error_len   equ $ - error_msg
    
    buffer      times 256 db 0
    array       dd 10, 25, 8, 42, 15, 73, 91, 56, 33, 67
    array_size  equ ($ - array) / 4
    
    counter     dd 0
    max_value   dd 100
    temp_var    dd 0
    
    ; Constantes matemáticas
    pi          dd 3.14159265
    e_const     dd 2.71828182
    sqrt2       dd 1.41421356
    
    ; Strings diversas
    prompt      db 'Digite um numero: ', 0
    prompt_len  equ $ - prompt
    
    result_str  db 'Resultado: ', 0
    result_len  equ $ - result_str
    
    hex_chars   db '0123456789ABCDEF'

section .bss
    ; Variáveis não inicializadas
    user_input  resb 32
    calc_buffer resb 64
    stack_ptr   resq 1
    heap_ptr    resq 1
    
    ; Arrays dinâmicos
    dyn_array   resd 50
    temp_stack  resd 100
    
    ; Buffers para operações
    file_buffer resb 1024
    net_buffer  resb 512

section .text
    global _start

; ============ PROGRAMA PRINCIPAL ============
_start:
    ; Inicialização do sistema
    call system_init
    call setup_memory
    call clear_buffers
    
    ; Mensagem de início
    mov rax, 1
    mov rdi, 1
    mov rsi, msg1
    mov rdx, msg1_len
    syscall
    
    ; Processamento principal
    call main_loop
    
    ; Finalização
    call cleanup
    jmp exit_program

; ============ INICIALIZAÇÃO DO SISTEMA ============
system_init:
    push rbp
    mov rbp, rsp
    
    ; Salvar stack pointer original
    mov [stack_ptr], rsp
    
    ; Configurar heap
    mov rax, 12        ; brk syscall
    xor rdi, rdi
    syscall
    mov [heap_ptr], rax
    
    ; Inicializar contadores
    mov dword [counter], 0
    mov dword [temp_var], 0
    
    ; Configurar array dinâmico
    call init_dyn_array
    
    pop rbp
    ret

; ============ LOOP PRINCIPAL ============
main_loop:
    push rbp
    mov rbp, rsp
    sub rsp, 32        ; Espaço para variáveis locais
    
.loop_start:
    ; Verificar se deve continuar
    mov eax, [counter]
    cmp eax, [max_value]
    jge .loop_end
    
    ; Processar diferentes operações baseado no contador
    mov ebx, eax
    and ebx, 7         ; Módulo 8 para selecionar operação
    
    cmp ebx, 0
    je .op_array_sort
    
    cmp ebx, 1
    je .op_math_calc
    
    cmp ebx, 2
    je .op_string_proc
    
    cmp ebx, 3
    je .op_memory_test
    
    cmp ebx, 4
    je .op_bit_ops
    
    cmp ebx, 5
    je .op_file_sim
    
    cmp ebx, 6
    je .op_network_sim
    
    cmp ebx, 7
    je .op_system_call
    
    jmp .default_op

.op_array_sort:
    call bubble_sort
    jmp .op_complete

.op_math_calc:
    call math_operations
    jmp .op_complete

.op_string_proc:
    call string_processing
    jmp .op_complete

.op_memory_test:
    call memory_operations
    jmp .op_complete

.op_bit_ops:
    call bit_operations
    jmp .op_complete

.op_file_sim:
    call file_operations_sim
    jmp .op_complete

.op_network_sim:
    call network_operations_sim
    jmp .op_complete

.op_system_call:
    call system_operations
    jmp .op_complete

.default_op:
    call default_operation

.op_complete:
    ; Incrementar contador
    inc dword [counter]
    
    ; Exibir progresso a cada 10 iterações
    mov eax, [counter]
    test eax, 0xF
    jnz .no_display
    
    call display_progress
    
.no_display:
    jmp .loop_start

.loop_end:
    add rsp, 32
    pop rbp
    ret

; ============ OPERAÇÕES DE ARRAY ============
bubble_sort:
    push rbp
    mov rbp, rsp
    
    mov ecx, array_size
    dec ecx
    
.outer_loop:
    mov esi, 0
    mov edi, 0
    
.inner_loop:
    mov eax, [array + esi*4]
    mov ebx, [array + esi*4 + 4]
    cmp eax, ebx
    jle .no_swap
    
    ; Swap
    mov [array + esi*4], ebx
    mov [array + esi*4 + 4], eax
    mov edi, 1
    
.no_swap:
    inc esi
    cmp esi, ecx
    jl .inner_loop
    
    test edi, edi
    jz .sort_done
    
    loop .outer_loop

.sort_done:
    pop rbp
    ret

; ============ OPERAÇÕES MATEMÁTICAS ============
math_operations:
    push rbp
    mov rbp, rsp
    
    ; Calcular fatorial do contador (módulo 10)
    mov eax, [counter]
    and eax, 0xF
    call factorial
    
    ; Multiplicar por pi
    fild dword [temp_var]
    fld dword [pi]
    fmul
    fistp dword [temp_var]
    
    ; Adicionar constante e
    mov eax, [temp_var]
    add eax, 0x2B7E1516  ; Constante arbitrária
    mov [temp_var], eax
    
    pop rbp
    ret

factorial:
    push rbp
    mov rbp, rsp
    
    cmp eax, 1
    jle .fact_done
    
    mov ebx, eax
    mov ecx, eax
    dec ecx
    
.fact_loop:
    imul ebx, ecx
    dec ecx
    jnz .fact_loop
    
    mov [temp_var], ebx
    jmp .fact_exit

.fact_done:
    mov dword [temp_var], 1

.fact_exit:
    pop rbp
    ret

; ============ PROCESSAMENTO DE STRINGS ============
string_processing:
    push rbp
    mov rbp, rsp
    
    ; Converter contador para string hexadecimal
    mov eax, [counter]
    mov edi, buffer
    call int_to_hex_string
    
    ; Inverter string
    mov rsi, buffer
    call string_length
    mov rdi, buffer
    call reverse_string
    
    ; Adicionar prefixo
    mov rsi, result_str
    mov rdi, calc_buffer
    call string_copy
    
    mov rsi, buffer
    mov rdi, calc_buffer
    add rdi, result_len
    call string_concat
    
    pop rbp
    ret

string_length:
    push rbp
    mov rbp, rsp
    
    xor rcx, rcx
    dec rcx
    
.length_loop:
    inc rcx
    cmp byte [rsi + rcx], 0
    jne .length_loop
    
    mov rax, rcx
    pop rbp
    ret

string_copy:
    push rbp
    mov rbp, rsp
    
.copy_loop:
    mov al, [rsi]
    mov [rdi], al
    inc rsi
    inc rdi
    test al, al
    jnz .copy_loop
    
    pop rbp
    ret

string_concat:
    push rbp
    mov rbp, rsp
    
    ; Encontrar fim da string destino
.find_end:
    cmp byte [rdi], 0
    je .concat_start
    inc rdi
    jmp .find_end

.concat_start:
    call string_copy
    pop rbp
    ret

reverse_string:
    push rbp
    mov rbp, rsp
    
    call string_length
    mov rdx, rax
    dec rdx
    xor rcx, rcx
    
.reverse_loop:
    cmp rcx, rdx
    jge .reverse_done
    
    mov al, [rsi + rcx]
    mov bl, [rsi + rdx]
    mov [rsi + rcx], bl
    mov [rsi + rdx], al
    
    inc rcx
    dec rdx
    jmp .reverse_loop

.reverse_done:
    pop rbp
    ret

int_to_hex_string:
    push rbp
    mov rbp, rsp
    
    mov ecx, 8
    mov ebx, eax

.hex_loop:
    rol ebx, 4
    mov eax, ebx
    and eax, 0xF
    mov al, [hex_chars + eax]
    mov [rdi], al
    inc rdi
    loop .hex_loop
    
    mov byte [rdi], 0
    pop rbp
    ret

; ============ OPERAÇÕES DE MEMÓRIA ============
memory_operations:
    push rbp
    mov rbp, rsp
    
    ; Alocar memória dinâmica
    mov rax, 12        ; brk syscall
    mov rdi, [heap_ptr]
    add rdi, 4096      ; 4KB
    syscall
    
    mov [heap_ptr], rax
    
    ; Preencher com padrão
    mov rdi, rax
    sub rdi, 4096
    mov rcx, 1024      ; 1024 dwords
    mov eax, [counter]
    
.fill_loop:
    mov [rdi], eax
    add rdi, 4
    add eax, 0x01010101
    loop .fill_loop
    
    ; Verificar padrão
    mov rdi, [heap_ptr]
    sub rdi, 4096
    mov rcx, 1024
    mov ebx, [counter]
    
.verify_loop:
    mov edx, [rdi]
    cmp edx, ebx
    jne .verify_error
    add rdi, 4
    add ebx, 0x01010101
    loop .verify_loop
    
    jmp .memory_done

.verify_error:
    ; Registrar erro
    mov dword [temp_var], 0xFFFFFFFF

.memory_done:
    pop rbp
    ret

; ============ OPERAÇÕES BIT A BIT ============
bit_operations:
    push rbp
    mov rbp, rsp
    
    mov eax, [counter]
    
    ; Operações diversas
    not eax
    rol eax, 3
    xor eax, 0xDEADBEEF
    ror eax, 5
    and eax, 0x7FFFFFFF
    bswap eax
    bsf ecx, eax
    bsr edx, eax
    
    ; Combinar resultados
    imul ecx, edx
    add eax, ecx
    
    mov [temp_var], eax
    
    pop rbp
    ret

; ============ SIMULAÇÃO DE OPERAÇÕES DE ARQUIVO ============
file_operations_sim:
    push rbp
    mov rbp, rsp
    
    ; Simular escrita em arquivo
    mov rdi, file_buffer
    mov rsi, msg2
    mov rdx, msg2_len
    call simulated_write
    
    ; Simular leitura
    mov rsi, file_buffer
    mov rdi, calc_buffer
    mov rcx, msg2_len
    rep movsb
    
    ; Verificar integridade
    mov rsi, msg2
    mov rdi, calc_buffer
    mov rcx, msg2_len
    repe cmpsb
    jne .file_error
    
    mov dword [temp_var], 1
    jmp .file_done

.file_error:
    mov dword [temp_var], 0

.file_done:
    pop rbp
    ret

simulated_write:
    push rbp
    mov rbp, rsp
    
.write_loop:
    mov al, [rsi]
    mov [rdi], al
    inc rsi
    inc rdi
    dec rdx
    jnz .write_loop
    
    pop rbp
    ret

; ============ SIMULAÇÃO DE OPERAÇÕES DE REDE ============
network_operations_sim:
    push rbp
    mov rbp, rsp
    
    ; Simular pacote de rede
    mov eax, [counter]
    mov dword [net_buffer], eax
    mov dword [net_buffer + 4], 0x12345678
    mov dword [net_buffer + 8], 0xABCDEF00
    
    ; Calcular checksum
    mov rsi, net_buffer
    mov rcx, 12
    xor eax, eax
    
.checksum_loop:
    add eax, [rsi]
    add rsi, 4
    loop .checksum_loop
    
    not eax
    mov [net_buffer + 12], eax
    
    ; Verificar checksum
    mov rsi, net_buffer
    mov rcx, 16
    xor ebx, ebx
    
.verify_checksum:
    add ebx, [rsi]
    add rsi, 4
    loop .verify_checksum
    
    cmp ebx, 0xFFFFFFFF
    jne .network_error
    
    mov dword [temp_var], 1
    jmp .network_done

.network_error:
    mov dword [temp_var], 0

.network_done:
    pop rbp
    ret

; ============ OPERAÇÕES DO SISTEMA ============
system_operations:
    push rbp
    mov rbp, rsp
    
    ; Simular várias syscalls
    mov rax, 39        ; getpid
    syscall
    mov [temp_var], eax
    
    mov rax, 24        ; getuid
    syscall
    add [temp_var], eax
    
    ; Obter tempo atual
    mov rax, 201       ; time syscall
    xor rdi, rdi
    syscall
    mov [temp_var + 4], eax
    
    pop rbp
    ret

; ============ OPERAÇÃO PADRÃO ============
default_operation:
    push rbp
    mov rbp, rsp
    
    ; Operação simples de incremento
    mov eax, [counter]
    add eax, 0x1337
    xor eax, 0xCAFEBABE
    mov [temp_var], eax
    
    pop rbp
    ret

; ============ EXIBIÇÃO DE PROGRESSO ============
display_progress:
    push rbp
    mov rbp, rsp
    
    ; Converter contador para ASCII
    mov eax, [counter]
    mov edi, buffer
    call int_to_decimal_string
    
    ; Exibir mensagem
    mov rax, 1
    mov rdi, 1
    mov rsi, buffer
    mov rdx, 16
    syscall
    
    pop rbp
    ret

int_to_decimal_string:
    push rbp
    mov rbp, rsp
    
    mov ecx, 10
    mov ebx, eax
    lea rdi, [buffer + 15]
    mov byte [rdi], 0
    dec rdi
    
.decimal_loop:
    xor edx, edx
    mov eax, ebx
    div ecx
    add dl, '0'
    mov [rdi], dl
    dec rdi
    mov ebx, eax
    test eax, eax
    jnz .decimal_loop
    
    pop rbp
    ret

; ============ INICIALIZAÇÃO DE ARRAY DINÂMICO ============
init_dyn_array:
    push