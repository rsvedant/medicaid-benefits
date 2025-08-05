"use client";

import React from 'react';

export const AgenticSearchDiagram = () => {
  return (
    <svg className="w-full h-auto max-w-2xl mx-auto" viewBox="0 0 600 650" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
          <polygon points="0 0, 4 2, 0 4" fill="#3B82F6" />
        </marker>
        <marker id="arrowheadPurple" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
          <polygon points="0 0, 4 2, 0 4" fill="#8B5CF6" />
        </marker>
      </defs>
      
      {/* User Question */}
      <rect x="200" y="15" width="200" height="50" rx="25" fill="#3B82F6" />
      <text x="300" y="45" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">User Question</text>
      <path d="M300 65 L300 85" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrowhead)"></path>

      {/* AI Model */}
      <rect x="175" y="90" width="250" height="50" rx="25" fill="#3B82F6" />
      <text x="300" y="115" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Gemini</text>
      <text x="300" y="130" textAnchor="middle" fill="white" fontSize="11">Creates a search plan</text>
      <path d="M300 140 L300 160" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrowheadPurple)"></path>

      {/* RAG Search */}
      <rect x="225" y="165" width="150" height="40" rx="20" fill="#8B5CF6" />
      <text x="300" y="180" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">RAG Search</text>
      <text x="300" y="195" textAnchor="middle" fill="white" fontSize="10">Deep analysis</text>
      <path d="M300 205 L300 220" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrowheadPurple)"></path>

      {/* Government Sources */}
      <text x="300" y="235" textAnchor="middle" fill="black" fontSize="13" fontWeight="600">Government Sources</text>
      <g>
        <rect x="130" y="245" width="110" height="30" rx="5" fill="#F59E0B" />
        <text x="185" y="264" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Executive Orders</text>
        <rect x="245" y="245" width="110" height="30" rx="5" fill="#F59E0B" />
        <text x="300" y="264" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Congressional Bills</text>
        <rect x="360" y="245" width="110" height="30" rx="5" fill="#F59E0B" />
        <text x="415" y="264" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">CA State Codes</text>
      </g>
      <g>
        <rect x="187" y="285" width="110" height="30" rx="5" fill="#F59E0B" />
        <text x="242" y="304" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">SF Municipal Codes</text>
        <rect x="303" y="285" width="110" height="30" rx="5" fill="#F59E0B" />
        <text x="358" y="304" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">LA Municipal Codes</text>
      </g>
      <rect x="245" y="325" width="110" height="30" rx="5" fill="#F59E0B" />
      <text x="300" y="344" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">+ More Sources</text>
      <path d="M300 360 L300 375" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrowheadPurple)"></path>

      {/* Rank Fusion & Reranking */}
      <rect x="200" y="380" width="200" height="40" rx="20" fill="#8B5CF6" />
      <text x="300" y="395" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Rank Fusion & Reranking</text>
      <text x="300" y="410" textAnchor="middle" fill="white" fontSize="10">Filter by relevance</text>
      <path d="M300 420 L300 435" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrowheadPurple)"></path>

      {/* Multi-document Synthesis */}
      <rect x="200" y="440" width="200" height="40" rx="20" fill="#8B5CF6" />
      <text x="300" y="455" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Multi-document Synthesis</text>
      <text x="300" y="470" textAnchor="middle" fill="white" fontSize="10">Collects insights</text>
      <path d="M300 480 L300 495" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrowheadPurple)"></path>

      {/* Research Complete? */}
      <polygon points="300,500 360,530 300,560 240,530" fill="#8B5CF6" />
      <text x="300" y="525" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Research</text>
      <text x="300" y="540" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Complete?</text>
      
      {/* Loop back */}
      <path d="M360 530 L480 530 L480 115 L425 115" stroke="#3B82F6" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrowhead)" fill="none"></path>
      <text x="370" y="520" fill="#3B82F6" fontSize="10" fontWeight="600">No</text>
      
      {/* Yes path */}
      <path d="M300 560 L300 580" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrowhead)"></path>
      <text x="315" y="575" fill="#3B82F6" fontSize="10" fontWeight="600">Yes</text>

      {/* Comprehensive Answer */}
      <rect x="200" y="585" width="200" height="50" rx="25" fill="#3B82F6" />
      <text x="300" y="605" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Comprehensive Answer</text>
      <text x="300" y="620" textAnchor="middle" fill="white" fontSize="10">with Verified Citations</text>
    </svg>
  );
};
