"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";

export default function Optimization() {
    const params = useParams();
    const projectid = params.slug;
    const [optimizationData, setOptimizationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [actionStatus, setActionStatus] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const fetchOptimizationData = useCallback(async () => {
        if (!projectid) return;
        try {
            setLoading(true);
            const response = await fetch(`/api/projects/${projectid}/optimization`);
            if (!response.ok) throw new Error('Failed to fetch optimization data');
            const data = await response.json();
            setOptimizationData(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [projectid]);

    useEffect(() => {
        if (projectid) {
            fetchOptimizationData();
        }
    }, [projectid, fetchOptimizationData]);

    const handleApplyOptimization = useCallback(async (sql, category, index, description) => {
        if (!projectid || !sql) return;
        try {
            setActionLoading(true);
            setActionStatus(null);
            const response = await fetch(`/api/projects/${projectid}/optimization`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: 'apply',
                    sql,
                    description: description || 'Database optimization'
                })
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data?.error || 'Failed to apply optimization');
            }

            // Remove the applied suggestion from UI
            setOptimizationData(prev => {
                if (!prev) return prev;
                
                const newData = { ...prev };
                
                if (category === 'missingIndexes') {
                    newData.missingIndexes = [...prev.missingIndexes];
                    newData.missingIndexes.splice(index, 1);
                } else if (category === 'schemaImprovements') {
                    newData.schemaImprovements = [...prev.schemaImprovements];
                    newData.schemaImprovements.splice(index, 1);
                }
                
                newData.totalSuggestions = Math.max(0, (prev.totalSuggestions || 0) - 1);
                
                return newData;
            });

            setActionStatus({ type: 'success', message: data.message || 'Optimization applied successfully.' });
            setShowSuccessModal(true);
        } catch (err) {
            setActionStatus({ type: 'error', message: err.message || 'Failed to apply optimization.' });
        } finally {
            setActionLoading(false);
        }
    }, [projectid]);

    const handleDismiss = useCallback((category, index) => {
        setOptimizationData(prev => {
            if (!prev) return prev;
            
            const newData = { ...prev };
            
            if (category === 'missingIndexes') {
                newData.missingIndexes = [...prev.missingIndexes];
                newData.missingIndexes.splice(index, 1);
            } else if (category === 'schemaImprovements') {
                newData.schemaImprovements = [...prev.schemaImprovements];
                newData.schemaImprovements.splice(index, 1);
            } else if (category === 'potentialIssues') {
                newData.potentialIssues = [...prev.potentialIssues];
                newData.potentialIssues.splice(index, 1);
            }
            
            newData.totalSuggestions = Math.max(0, (prev.totalSuggestions || 0) - 1);
            
            return newData;
        });
    }, []);

    const styles = {
        optimizationContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "0px",
            width: "100%",
            minHeight: "100%",
        },
        headerSection: {
            position: "relative",
            width: "100%",
            padding: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backdropFilter: "blur(4px)",
        },
        title: {
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 700,
            fontSize: "32px",
            lineHeight: "24px",
            margin: 0,
            padding: 0,
        },
        suggestionCount: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "13px 25px",
            borderRadius: "14px",
            gap: "10px",
            minWidth: "255px",
        },
        countNumber: {
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: "36px",
        },
        countLabel: {
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
        },
        card: {
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "24px",
            gap: "24px",
            width: "90%",
            margin: "24px auto",
            borderRadius: "14px",
        },
        cardAlert: {
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "24px",
            gap: "16px",
            width: "90%",
            margin: "24px auto",
            borderWidth: "0.8px 0.8px 0.8px 4px",
            borderStyle: "solid",
            borderColor: "#D4183D",
            borderRadius: "14px",
        },
        cardHeader: {
            width: "100%",
        },
        cardTitle: {
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "16px",
            margin: 0,
            padding: "0 0 8px 0",
        },
        cardDescription: {
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "24px",
            margin: 0,
            padding: 0,
        },
        cardContent: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
        },
        performanceItem: {
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
        },
        performanceHeader: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
        },
        queryName: {
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
        },
        queryTime: {
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
        },
        progressBar: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            height: "8px",
            borderRadius: "999px",
            overflow: "hidden",
        },
        progressFill: {
            height: "100%",
            borderRadius: "999px",
            transition: "width 0.3s ease",
        },
        alertHeader: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: "16px",
            width: "100%",
        },
        alertIcon: {
            fontSize: "16px",
            width: "16px",
            height: "16px",
            flexShrink: 0,
            marginTop: "4px",
        },
        alertTitleContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
            flex: 1,
        },
        alertTitle: {
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "24px",
            margin: 0,
            padding: 0,
        },
        badgeHigh: {
            background: "#D4183D",
            color: "#FFFFFF",
            padding: "2px 8px",
            borderRadius: "8px",
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "16px",
            whiteSpace: "nowrap",
        },
        alertDescription: {
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "24px",
            margin: 0,
            padding: 0,
            width: "100%",
        },
        alertBox: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: "16px",
            width: "100%",
            padding: "16px",
            borderRadius: "10px",
        },
        alertDetails: {
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            flex: 1,
        },
        alertLabel: {
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            margin: 0,
            padding: 0,
            letterSpacing: "-0.35px",
        },
        sqlCode: {
            fontFamily: "'Cousine', monospace",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "16px",
            wordBreak: "break-all",
            padding: "8px",
            borderRadius: "4px",
            margin: "4px 0 0 0",
        },
        performanceInsight: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
            padding: 0,
            marginTop: "8px",
        },
        improvementIcon: {
            fontSize: "16px",
        },
        improvementText: {
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
        },
        actionButtons: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "8px",
            width: "100%",
        },
        buttonIgnore: {
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            width: "auto",
            height: "32px",
            borderRadius: "8px",
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            cursor: "pointer",
            transition: "all 0.2s ease",
        },
        buttonApply: {
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            width: "auto",
            height: "32px",
            background: "#2B5A9E",
            border: "none",
            borderRadius: "8px",
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#FFFFFF",
            cursor: "pointer",
            transition: "all 0.2s ease",
        },
        tableContainer: {
            width: "100%",
            overflowX: "auto",
        },
        dataTable: {
            width: "100%",
            borderCollapse: "collapse",
        },
        tableHeader: {
        },
        tableHeaderCell: {
            padding: "12px 16px",
            textAlign: "left",
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "24px",
        },
        tableRow: {
        },
        tableCell: {
            padding: "12px 16px",
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "24px",
        },
        centerAlign: {
            textAlign: "center",
        },
        actionCell: {
            textAlign: "center",
        },
        actionButton: {
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            padding: "4px 8px",
            borderRadius: "4px",
            transition: "all 0.2s ease",
        },
        duplicateBadge: {
            background: "#EDFF77",
            color: "#F00000",
            padding: "4px 8px",
            borderRadius: "7px",
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "24px",
        },
        removeButton: {
            background: "transparent",
            border: "1px solid #EDFF77",
            color: "#F00000",
            cursor: "pointer",
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            padding: "6px 12px",
            borderRadius: "7px",
            transition: "all 0.2s ease",
        },
        modalOverlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        },
        modalContent: {
            background: "#FFFFFF",
            padding: "32px",
            borderRadius: "16px",
            width: "320px",
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            fontFamily: "'Arimo', sans-serif",
        },
        modalTitle: {
            fontSize: "20px",
            fontWeight: 600,
            marginBottom: "12px",
            color: "#065f46",
        },
        modalButton: {
            marginTop: "16px",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#2B5A9E",
            color: "#FFFFFF",
            cursor: "pointer",
            fontSize: "14px",
        },
        statusBanner: {
            width: "90%",
            margin: "0 auto 12px auto",
            padding: "12px 16px",
            borderRadius: "10px",
            fontFamily: "'Arimo', sans-serif",
            fontSize: "15px",
        },
        statusSuccess: {
            background: "#ecfdf5",
            color: "#065f46",
            border: "1px solid #34d399",
        },
        statusError: {
            background: "#fef2f2",
            color: "#b91c1c",
            border: "1px solid #fca5a5",
        },
        loadingContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
            fontFamily: "'Arimo', sans-serif",
            fontSize: "16px",
            color: "#2B5A9E",
        },
        errorContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
            fontFamily: "'Arimo', sans-serif",
            fontSize: "16px",
            color: "#D4183D",
        },
    };

    const queryPerformance = useMemo(
        () => (optimizationData && optimizationData.queryPerformance) ? optimizationData.queryPerformance : [],
        [optimizationData]
    );
    const maxQueryTime = useMemo(
        () => Math.max(...queryPerformance.map(item => item.time || 0), 1),
        [queryPerformance]
    );
    const missingIndexes = optimizationData?.missingIndexes || [];
    const schemaImprovements = optimizationData?.schemaImprovements || [];
    const potentialIssues = optimizationData?.potentialIssues || [];

    if (loading) {
        return <div style={styles.loadingContainer} className="bg-background text-foreground">Loading optimization data...</div>;
    }

    if (error) {
        return <div style={styles.errorContainer} className="bg-background text-red-600">Error: {error}</div>;
    }

    return (
        <div style={styles.optimizationContainer} className="bg-background">
            {/* Header Section */}
            <div style={styles.headerSection} className="bg-card/80 border-b border-border">
                <h1 style={styles.title} className="text-primary">Optimization Suggestions</h1>
                <div style={styles.suggestionCount} className="bg-card border border-border">
                    <span style={styles.countNumber} className="text-primary">
                        {optimizationData?.totalSuggestions || 0}
                    </span>
                    <span style={styles.countLabel} className="text-foreground">Total Suggestions</span>
                </div>
            </div>

            {optimizationData?.warning && (
                <div style={{ ...styles.card, borderColor: "#FACC15", color: "#92400E", margin: "24px auto", width: "90%" }}>
                    {optimizationData.warning}
                </div>
            )}

            {actionStatus && (
                <div
                    style={{
                        ...styles.statusBanner,
                        ...(actionStatus.type === 'success' ? styles.statusSuccess : styles.statusError)
                    }}
                >
                    {actionStatus.message}
                </div>
            )}

            {/* Query Performance Card */}
            {queryPerformance.length > 0 && (
                <div style={styles.card} className="bg-card border border-border">
                    <div style={styles.cardHeader}>
                        <h2 style={styles.cardTitle} className="text-foreground">Query Performance</h2>
                        <p style={styles.cardDescription} className="text-muted-foreground">
                            AI-estimated execution times for common query patterns
                        </p>
                    </div>
                    <div style={styles.cardContent}>
                        {queryPerformance.map((query, idx) => (
                            <div key={`${query.name}-${idx}`} style={styles.performanceItem}>
                                <div style={styles.performanceHeader}>
                                    <span style={styles.queryName} className="text-foreground">{query.name}</span>
                                    <span style={styles.queryTime} className="text-muted-foreground">{query.time}ms</span>
                                </div>
                                <div style={styles.progressBar} className="bg-muted">
                                    <div
                                        style={{
                                            ...styles.progressFill,
                                            width: `${(query.time / maxQueryTime) * 100}%`
                                        }}
                                        className="bg-primary"
                                    />
                                </div>
                                {query.suggestion && (
                                    <p style={{...styles.cardDescription, marginTop: "8px", fontSize: "14px"}} className="text-muted-foreground">
                                        💡 {query.suggestion}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Missing Indexes */}
            {missingIndexes.length > 0 && missingIndexes.map((index, idx) => (
                <div key={`index-${idx}`} style={styles.cardAlert} className="bg-card">
                    <div style={styles.alertHeader}>
                        <div style={styles.alertIcon}>⚠️</div>
                        <div style={styles.alertTitleContainer}>
                            <h3 style={styles.alertTitle} className="text-foreground">
                                Missing Index: {index.tableName}.{index.columnName}
                            </h3>
                            <span style={styles.badgeHigh}>{index.severity || "HIGH"}</span>
                        </div>
                    </div>
                    <p style={styles.alertDescription} className="text-muted-foreground">
                        {index.reason || `Adding an index on this column could improve query performance.`}
                    </p>
                    <div style={styles.cardContent}>
                        <div style={styles.alertBox} className="bg-card border border-border">
                            <div style={styles.alertIcon}>💡</div>
                            <div style={styles.alertDetails}>
                                <p style={styles.alertLabel} className="text-foreground">SQL Command</p>
                                <code style={styles.sqlCode} className="bg-muted text-muted-foreground">
                                    {index.suggestion}
                                </code>
                            </div>
                        </div>
                        {index.estimatedImprovement && (
                            <div style={styles.performanceInsight}>
                                <span style={styles.improvementIcon}>📈</span>
                                <span style={styles.improvementText} className="text-muted-foreground">
                                    Estimated improvement: {index.estimatedImprovement}
                                </span>
                            </div>
                        )}
                    </div>
                    <div style={styles.actionButtons}>
                        <button
                            style={{ ...styles.buttonIgnore, opacity: actionLoading ? 0.7 : 1, cursor: 'pointer' }}
                            className="bg-muted border border-border text-foreground hover:bg-accent"
                            disabled={actionLoading}
                            onClick={() => handleDismiss('missingIndexes', idx)}
                        >
                            <span>✕</span> Ignore
                        </button>
                        <button
                            style={{ ...styles.buttonApply, opacity: actionLoading ? 0.7 : 1, cursor: 'pointer' }}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                            disabled={actionLoading}
                            onClick={() => handleApplyOptimization(
                                index.suggestion, 
                                'missingIndexes', 
                                idx,
                                `Index optimization: ${index.reason || 'Improve query performance'}`
                            )}
                        >
                            <span>✓</span> Apply Index
                        </button>
                    </div>
                </div>
            ))}

            {/* Schema Improvements */}
            {schemaImprovements.length > 0 && (
                <div style={styles.card} className="bg-card border border-border">
                    <div style={styles.cardHeader}>
                        <h2 style={styles.cardTitle} className="text-foreground">Schema Improvements</h2>
                        <p style={styles.cardDescription} className="text-muted-foreground">
                            AI-recommended improvements to your database schema
                        </p>
                    </div>
                    <div style={styles.cardContent}>
                        {schemaImprovements.map((improvement, idx) => (
                            <div key={`improvement-${idx}`} style={{
                                ...styles.alertBox,
                                marginBottom: idx < schemaImprovements.length - 1 ? "16px" : "0"
                            }} className="bg-card border border-border">
                                <div style={styles.alertDetails}>
                                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px"}}>
                                        <p style={styles.alertLabel} className="text-foreground">
                                            <strong>{improvement.tableName}</strong> - {improvement.issue}
                                        </p>
                                        <span style={{
                                            ...styles.badgeHigh,
                                            background: improvement.priority === 'HIGH' ? '#D4183D' : 
                                                       improvement.priority === 'MEDIUM' ? '#F59E0B' : '#10B981',
                                            padding: "2px 8px",
                                            borderRadius: "4px",
                                            fontSize: "12px"
                                        }}>
                                            {improvement.priority || "MEDIUM"}
                                        </span>
                                    </div>
                                    {improvement.suggestion && (
                                        <code style={styles.sqlCode}>
                                            {improvement.suggestion}
                                        </code>
                                    )}
                                    {improvement.impact && (
                                        <p style={{...styles.cardDescription, marginTop: "8px", fontSize: "14px"}}>
                                            Impact: {improvement.impact}
                                        </p>
                                    )}
                                    <div style={{...styles.actionButtons, marginTop: "12px"}}>
                                        <button
                                            style={{ ...styles.buttonIgnore, opacity: actionLoading ? 0.7 : 1, cursor: 'pointer' }}
                                            className="bg-muted border border-border text-foreground hover:bg-accent"
                                            disabled={actionLoading}
                                            onClick={() => handleDismiss('schemaImprovements', idx)}
                                        >
                                            <span>✕</span> Dismiss
                                        </button>
                                        {improvement.suggestion && improvement.suggestion.trim().toUpperCase().startsWith('ALTER') && (
                                            <button
                                                style={{ ...styles.buttonApply, opacity: actionLoading ? 0.7 : 1, cursor: 'pointer' }}
                                                className="bg-primary text-primary-foreground hover:bg-primary/90"
                                                disabled={actionLoading}
                                                onClick={() => handleApplyOptimization(
                                                    improvement.suggestion, 
                                                    'schemaImprovements', 
                                                    idx,
                                                    `Schema improvement: ${improvement.issue} - ${improvement.impact || 'Optimize database structure'}`
                                                )}
                                            >
                                                <span>✓</span> Apply
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Potential Issues */}
            {potentialIssues.length > 0 && (
                <div style={styles.card} className="bg-card border border-border">
                    <div style={styles.cardHeader}>
                        <h2 style={styles.cardTitle} className="text-foreground">Potential Issues</h2>
                        <p style={styles.cardDescription} className="text-muted-foreground">
                            AI-identified issues that may require manual review
                        </p>
                    </div>
                    <div style={styles.tableContainer}>
                        <table style={styles.dataTable} className="bg-card border border-border">
                            <thead style={styles.tableHeader} className="bg-muted">
                                <tr>
                                    <th style={styles.tableHeaderCell} className="text-foreground border-b border-r border-border">Table</th>
                                    <th style={styles.tableHeaderCell} className="text-foreground border-b border-r border-border">Issue</th>
                                    <th style={styles.tableHeaderCell} className="text-foreground border-b border-r border-border">Severity</th>
                                    <th style={styles.tableHeaderCell} className="text-foreground border-b border-r border-border">Recommendation</th>
                                    <th style={styles.tableHeaderCell} className="text-foreground border-b border-border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {potentialIssues.map((issue, idx) => (
                                    <tr key={`issue-${idx}`} style={styles.tableRow} className="border-b border-border hover:bg-muted/50">
                                        <td style={styles.tableCell} className="text-foreground border-r border-border">{issue.tableName}</td>
                                        <td style={styles.tableCell} className="text-foreground border-r border-border">{issue.issue}</td>
                                        <td style={{ ...styles.tableCell, ...styles.centerAlign }}>
                                            <span style={{
                                                ...styles.badgeHigh,
                                                background: issue.severity === 'HIGH' ? '#D4183D' : 
                                                           issue.severity === 'MEDIUM' ? '#F59E0B' : '#10B981',
                                                padding: "4px 8px",
                                                borderRadius: "4px"
                                            }}>
                                                {issue.severity || "MEDIUM"}
                                            </span>
                                        </td>
                                        <td style={styles.tableCell} className="text-foreground border-r border-border">{issue.recommendation}</td>
                                        <td style={{ ...styles.tableCell, ...styles.actionCell }}>
                                            <button
                                                style={{...styles.actionButton, cursor: 'pointer'}}
                                                className="bg-muted border border-border text-foreground hover:bg-accent px-3 py-1 rounded"
                                                onClick={() => handleDismiss('potentialIssues', idx)}
                                            >
                                                Dismiss
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent} className="bg-card border border-border">
                        <h3 style={styles.modalTitle} className="text-foreground">✓ Optimization Applied</h3>
                        <p className="text-muted-foreground">Your optimization has been successfully applied to the database.</p>
                        <button
                            style={{...styles.modalButton, cursor: 'pointer'}}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={() => setShowSuccessModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}