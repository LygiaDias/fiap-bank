"use client";

import React, { useEffect, useMemo, useState } from "react";
import Button from "./Button";
import type { Attachment, Transaction } from "../context/TransactionsContext";
import { suggestCategory } from "../utils/suggestCategory";

type Props = {
  onClose?: () => void;
  onSubmit: (t: Omit<Transaction, "id">) => void;
  initial?: Partial<Transaction>;
};

function formatCurrencyBR(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

type FieldName = "type" | "amount" | "date" | "description" | "category" | "attachments";

export default function TransactionForm({ onClose, onSubmit, initial }: Props) {
  const [type, setType] = useState<Transaction["type"]>(initial?.type ?? "deposit");
  const [amount, setAmount] = useState<number>(initial?.amount ?? 0);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState(initial?.category ?? "");
  const [attachments, setAttachments] = useState<Attachment[]>(initial?.attachments ?? []);

  // controle de UX da validação
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    type: false,
    amount: false,
    date: false,
    description: false,
    category: false,
    attachments: false,
  });

  const errors = useMemo(() => {
    const e: Record<FieldName, string | undefined> = {
      type: undefined,
      amount: undefined,
      date: undefined,
      description: undefined,
      category: undefined,
      attachments: undefined,
    };

    // type
    if (!type) e.type = "Selecione um tipo.";

    // date
    if (!date) e.date = "Selecione uma data.";

    // amount
    if (!amount || amount <= 0) e.amount = "O valor deve ser maior que zero.";

    // description
    const desc = description.trim();
    if (!desc) e.description = "Descrição é obrigatória.";
    else if (desc.length < 3) e.description = "Descrição muito curta.";

    // category
    if (!category.trim()) e.category = "Categoria é obrigatória.";

    // attachments
    const maxFiles = 3;
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (attachments.length > maxFiles) {
      e.attachments = "Você pode anexar no máximo 3 arquivos.";
    } else if (attachments.some((f) => f.size > maxSize)) {
      e.attachments = "Cada anexo deve ter no máximo 5MB.";
    }

    return e;
  }, [amount, attachments, category, date, description, type]);

  const isValid = useMemo(() => {
    return Object.values(errors).every((v) => !v);
  }, [errors]);

  // regra de exibição: só mostra erro se submeteu ou se tocou no campo
  function showError(field: FieldName) {
    return Boolean(errors[field]) && (submitted || touched[field]);
  }

  // sugestão automática de categoria
  useEffect(() => {
    if (!description.trim()) return;

    // só sugere se categoria ainda não foi tocada pelo usuário
    if (touched.category) return;

    // só sugere se está vazia
    if (category.trim()) return;

    const suggested = suggestCategory(description, type);
    setCategory(suggested);
  }, [description, type]); // intencional

  function handleFiles(files: FileList | null) {
    if (!files) return;

    setTouched((prev) => ({ ...prev, attachments: true }));

    const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
    const next: Attachment[] = [];

    Array.from(files).forEach((file) => {
      if (!allowedTypes.includes(file.type)) return;

      next.push({
        id: generateId(),
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      });
    });

    setAttachments((prev) => [...prev, ...next]);
  }

  function removeAttachment(id: string) {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);

    if (!isValid) return;

    onSubmit({
      type,
      amount: Number(amount),
      description: description.trim(),
      date,
      category: category.trim(),
      attachments,
    });

    if (onClose) onClose();
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3" aria-label="Formulário de transação">
      {/* Tipo */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Tipo</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as Transaction["type"])}
          onBlur={() => setTouched((prev) => ({ ...prev, type: true }))}
          className="p-2 rounded border"
        >
          <option value="deposit">Depósito</option>
          <option value="transfer">Transferência</option>
          <option value="payment">Pagamento</option>
          <option value="withdraw">Saque</option>
        </select>
        {showError("type") && <span className="text-xs text-red-600">{errors.type}</span>}
      </div>

      {/* Valor */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Valor</label>
        <input
          type="text"
          value={formatCurrencyBR(amount)}
          onChange={(e) => {
            const numericValue = Number(e.target.value.replace(/\D/g, "")) / 100;
            setAmount(numericValue);
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, amount: true }))}
          placeholder="Valor"
          className="p-2 rounded border"
          inputMode="numeric"
        />
        {showError("amount") && <span className="text-xs text-red-600">{errors.amount}</span>}
      </div>

      {/* Data */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Data</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, date: true }))}
          className="p-2 rounded border"
        />
        {showError("date") && <span className="text-xs text-red-600">{errors.date}</span>}
      </div>

      {/* Descrição */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Descrição</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, description: true }))}
          placeholder="Ex: Uber, iFood, Mercado..."
          className="p-2 rounded border"
        />
        {showError("description") && <span className="text-xs text-red-600">{errors.description}</span>}
      </div>

      {/* Categoria */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Categoria</label>
        <input
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, category: true }))}
          placeholder="Ex: Alimentação, Transporte..."
          className="p-2 rounded border"
          list="categories"
        />

        <datalist id="categories">
          <option value="Alimentação" />
          <option value="Transporte" />
          <option value="Mercado" />
          <option value="Moradia" />
          <option value="Assinaturas" />
          <option value="Saúde" />
          <option value="Contas" />
          <option value="Investimentos" />
          <option value="Transferências" />
          <option value="Receitas" />
          <option value="Outros" />
        </datalist>

        {showError("category") && <span className="text-xs text-red-600">{errors.category}</span>}
      </div>

      {/* Anexos */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">Anexos (PDF/JPG/PNG)</label>

        <input
          type="file"
          multiple
          accept=".pdf,image/png,image/jpeg"
          onChange={(e) => handleFiles(e.target.files)}
          className="p-2 rounded border"
        />

        {showError("attachments") && <span className="text-xs text-red-600">{errors.attachments}</span>}

        {attachments.length > 0 && (
          <div className="flex flex-col gap-2">
            {attachments.map((a) => (
              <div key={a.id} className="flex items-center justify-between p-2 rounded border bg-white">
                <div className="flex items-center gap-3">
                  {a.previewUrl ? (
                    <img src={a.previewUrl} alt={`Preview ${a.name}`} className="w-10 h-10 rounded object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                      PDF
                    </div>
                  )}

                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{a.name}</span>
                    <span className="text-xs text-gray-400">{Math.round(a.size / 1024)} KB</span>
                  </div>
                </div>

                <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(a.id)}>
                  Remover
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ações */}
      <div className="flex justify-end gap-2 pt-2">
        {onClose && (
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        )}

        <Button type="submit">
          Salvar
        </Button>
      </div>
    </form>
  );
}
